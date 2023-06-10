# 作成手順書　 Rails React API 実装

- 1. ディレクトリの作成
- 2. ディレクトリ移動し、rails new backend -d mysql --api
- 3. Gem ファイルに gem 'dotenv-rails'と gem 'rack-cors'を追記.
- 4. .env ファイルの作成。DATABASE_DEFAULT_USER = '<ユーザー名>'の形で環境変数作成。
- 5. database.yml ファイルに環境変数で接続方法等記述する。※.gitignore に/.env を忘れないこと。
- 6. routes.rb に下記記述。コントローラー名に対応した resource のルートが localhost:3000/api/v1 の形で続く。

```
Rails.application.routes.draw do
  namespace :api do
    namespace :v1, format: :json do
      resources :コントローラー名
    end
  end
end
```

- 7. rails g controller api::v1::tasks で先ほどの route に対応したコントローラーファイル作成
- 8. config/puma.rb ファイルの port ENV.fetch("PORT") { 3000 }この部分で port 番号の変更
- 9. config/initializers/cors.rb のコメントアウトを戻し、下記記述にする。とりあえず origins の部分で許可する URL は React の port 番号の URL。resource の許可ファイルは全てに設定。

```
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "http://localhost:3000"

    resource "*",
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
```

- 10. Ruby の静的解析ツールの Gem を Gemfile に下記追加し bundle install する。
- 11. その後 bundle exec rubocop --auto-gen-config を打ち込むとファイル作成される。bundle exec rubocop で使用可能。カレントディレクトリ以降検査。-a で自動修正。

```
group :development do
  gem 'rubocop', require: false
  gem "rubocop-performance", require: false
  gem "rubocop-rails", require: false
  gem "rubocop-rspec", require: false
end
```

- 12. プロジェクト直下に移動し npm create-react-app frontend で React の雛形作成
- 13. frontend ディレクトリで npm install axios で axios のインストール
- 14. tailwind の追加。npm install -D tailwindcss postcss autoprefixer を行い、npx tailwindcss init を打ち込む。
- 15. tailwind.config.js ファイルに下記を書き込む。

```
module.exports = {
content: [
"./src/**/*.{js,jsx,ts,tsx}",
],
theme: {
extend: {},
},
plugins: [],
}
```

- 16. index.css ファイルに下記書き込む

```
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
```

- 17. 認証機能 gem "bcrypt"と gem "jwt"を記述し bundle install する
- 18. rails g model users name:string password_digest:string email:string このような感じでテーブル作成。そしてモデルファイルに has_secure_password を記述する。
  <!-- - 19. https://api.rubyonrails.org/classes/ActiveModel/SecurePassword/ClassMethods.html 参照

  - 20. Rails アプリ部分で mkdir auth && cd $\_を実施。その後、実施 openssl genrsa 2024 > service.key。ここでは genrsa は RSA 秘密鍵の生成コマンドで、2024 は鍵の長さ（ビット単位）を指定し、service.key ファイルを作成しそこに秘密鍵保存するようにしている。.gitignore に記述忘れないように。
  - 21. 下記コードで確認できる

  ````
  $ rails c

  ### 配置した『service.key』を読み込み rsa_private変数に入れ込む。
  ### rootディレクトリにあるauthディレクトリのservice.keyファイルのルートをRails.root.joinで作成し、File.readでそれを読み込む。
  ### OpenSSLライブラリを使用して、OpenSSL::PKey::RSA.newで指定された秘密鍵ファイルの内容を使用して、RSA鍵オブジェクトを生成するコード。
  > rsa_private = OpenSSL::PKey::RSA.new(File.read(Rails.root.join('auth/service.key')))

  ### テストデータ（payload）ととしてハッシュを作成
  > payload = { id: 1, name: 'Yamada' }

  ### 秘密鍵を使ってテストデータをエンコード。つまり、JSON形式のデータをJWTトークンとして変更（エンコード）する。
  ### JWT（文字列）が作成されればOK。
  ### JWT.encodeメソッドは、指定されたペイロード（テストデータ）秘密鍵（rsa_private）およびアルゴリズム（RS256）を使用してJWTをエンコードし、生成されたJWTはtoken変数に格納される。

  > token = JWT.encode(payload, rsa_private, 'RS256')

  ### 秘密鍵を使ってJWTをデコード。つまり、JWTトークンをJSON形式のデータ変更（デコード）する。
  ### ペイロードが取得できればOK。指定されたJWT（token）、公開鍵（rsa_public）、バリデーション（true）、およびアルゴリズム（RS256）を使用してJWTをデコードしている。
  > JWT.decode(token, rsa_private, true, { algorithm: 'RS256' })
  => [{"id"=>1, "name"=>"Yamada"}, {"alg"=>"RS256"}]
  ``` -->

  ````

- 22. サーバーサイドで Cookie を使用する。include ActionController::Cookies を application_controller.rb に記述し、Cookie を include する。
- 23. config.middleware.use ActionDispatch::Cookies を config/application.rb に記述し Cookie を読み込む。参照https://nishinatoshiharu.com/rails-serverside-cookies/

```

```
