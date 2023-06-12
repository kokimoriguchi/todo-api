class SessionsController < ApplicationController
  def create
    user = User.new(user_params)

    if user.save
      #ペイロードの作成
      payload = {
        iss: "example_app", # JWTの発行者
        sub: user.id, # JWTの主体
        exp: (DateTime.current + 14.days).to_i # JWTの有効期限
      }

      #秘密鍵の取得
      # rootディレクトリにあるauthディレクトリのservice.keyファイルのルートをRails.root.joinで作成し、File.readでそれを読み込む。
      # OpenSSLライブラリを使用して、OpenSSL::PKey::RSA.newで指定された秘密鍵ファイルの内容を使用して、RSA鍵オブジェクトを生成するコード。
      rsa_private = OpenSSL::PKey::RSA.new(File.read(Rails.root.join('auth/service.key')))


      # JWTの作成
      # 秘密鍵を使ってテストデータをエンコード。つまり、JSON形式のデータをJWTトークンとして変更（エンコード）する。
      # JWT（文字列）が作成されればOK。
      # JWT.encodeメソッドは、指定されたペイロード（テストデータ）秘密鍵（rsa_private）およびアルゴリズム（RS256）を使用してJWTをエンコードし、生成されたJWTはtoken変数に格納される。
      token = JWT.encode(payload, rsa_private, "RS256")

      # JWTをCookieにセット
      cookies[:token] = {
        value: token,
        same_site: :none  # same_site 属性を none に設定します。
      }

      # puts token
      puts cookies[:token]
      render json: { user: { name: user.name, token: cookies }, message: "User created successfully" }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end

  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password)
  end


end
