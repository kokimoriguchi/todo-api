class UsersController < ApplicationController

  def show
    # CookieからJWTを取得
    token = cookies[:token]

    # 秘密鍵の取得
    rsa_private = OpenSSL::PKey::RSA.new(File.read(Rails.root.join('auth/service.key')))

     # JWTのデコード。JWTからペイロードが取得できない場合は認証エラーにする
    begin
      decoded_token = JWT.decode(token, rsa_private, true, {algorithm: 'RS256'} )
      user_id = decoded_token.first["sub"]
    rescue JWT::DecodeError, JWT::ExpiredSignature, JWT::VerificationError
      return render json: { message: 'unauthorized' }, status: :unauthorized
    end

    # ユーザーを検索
    user = User.find(user_id)

    # userが取得できた場合はユーザー情報を返す、取得できない場合は認証エラー
    if user.nil?
      # render json: { message: 'unauthorized' }, status: :unauthorized
      console.log("error")
    else
      render json: {
        user: {
          id: user.id,
          name: user.name,
          token: decoded_token
        }
      }, status: :ok
    end
  end
end
