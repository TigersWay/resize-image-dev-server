# resize-image-dev-server
Little standalone server for resizing/cropping local images (fake CDN feature)

## Installation

git clone https://github.com/TigersWay/resize-image-dev-server.git

npm link resize-image-dev-server

## Usage
images [path] [--port <portNr>] [-q|--quiet]

- path    Path to images. Default value: ./public
- port    Default value: 3000
- quiet   Display only errors

ex:
- images . -p 8001
- images C:/www/images --port 9000


Classic url:

http://localhost:8001/images/path/to/the/image.jpg?h=200&w=200

Netlify:

http://localhost:9000/images/netlify/path/to/the/image.png?nf_resize=fit&w=300

http://localhost:9000/images/netlify/path/to/the/image.jpg?nf_resize=smartcrop&w=300&h=400
