# resize-image-dev-server
Little standalone server for resizing/cropping local images (fake CDN feature)

Default:

http://localhost:[port|3000]/images/path/to/the/image.jpg?h=200&w=200

Netlify:

http://localhost:[port|3000]/images/netlify/path/to/the/image.jpg?nf_resize=fit&w=300
http://localhost:[port|3000]/images/netlify/path/to/the/image.jpg?nf_resize=smartcrop&w=300&h=400
