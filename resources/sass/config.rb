require File.expand_path('../libs/retina.rb', __FILE__)
require File.expand_path('../libs/random-color.rb', __FILE__)
require "rgbapng"

#########################################################################################################
# Sass Configuration
Sass::Script::Number.precision = 20

# Set this to the root of your project when deployed:
http_path = "/"
css_dir = "../../public/layouts/frontoffice/css"
sass_dir = ""
images_dir = "../../public/layouts/frontoffice/images"
javascripts_dir = "../../public/layouts/frontoffice/js"
fonts_dir = "../../public/layouts/frontoffice/fonts"

relative_assets = true

if environment == :production
  output_style = :compressed
  line_comments = false
else
  output_style = :expanded
  sass_options = { :debug_info => false }
end

asset_cache_buster :none

# Minified files:
# $ compass compile -e production --force


