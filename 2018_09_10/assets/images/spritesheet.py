
from PIL import Image

image = Image.open("fry_states.png")

image_cropped = image.crop((1, 1, image.width - 2, image.height - 2))

new_image = Image.new("RGBA", (240, 240)) # TODO can be computed

for i in range(4):
  for j in range(4):
    c = image_cropped.crop((i * 62, j * 62, i * 62 + 60, j * 62 + 60))
    new_image.paste(c, (i * 60, j * 60))

new_image.save("fry_spritesheet.png")

