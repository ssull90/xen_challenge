FROM ruby:3.1.4

run apt-get update && apt-get install -y --no-install-recommends sqlite3

WORKDIR /usr/src/app
COPY Gemfile* ./
RUN bundle install && bundle exec rails db:create && bundle exec rails db:migrate && bundle exec rails db:seed
COPY . .

EXPOSE 3000
CMD ["rails", "server", "-b", "0.0.0.0"]
