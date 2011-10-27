require "rubygems"
require 'rack/contrib'
require 'rack-rewrite'

use Rack::Static, :root => "public"
use Rack::ETag
use Rack::Rewrite do
	rewrite '/', 'webume.html'
end
run Rack::Directory.new('public')
