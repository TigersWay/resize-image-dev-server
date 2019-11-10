# resize-image-dev-server
Little standalone server for resizing/cropping local images (fake CDN feature)

## Installation

git clone https://github.com/TigersWay/resize-image-dev-server.git

npm link resize-image-dev-server

## Usage
images path-of-images [-p port|3000] [-q|--quiet]

ex:
- images . -p 8001
- images C:/www/images --port 9000


Default url:

http://localhost:8001/images/path/to/the/image.jpg?h=200&w=200

Netlify:

http://localhost:9000/images/netlify/path/to/the/image.png?nf_resize=fit&w=300

http://localhost:9000/images/netlify/path/to/the/image.jpg?nf_resize=smartcrop&w=300&h=400
