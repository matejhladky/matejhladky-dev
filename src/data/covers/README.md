# Album covers

One image per record, named after its line in `../lps.txt`: lowercase, no
accents, everything else turned into dashes.

    Lana Del Rey: Blue Banisters      →  lana-del-rey-blue-banisters.jpg
    Earth, Wind & Fire: Gratitude    →  earth-wind-and-fire-gratitude.jpg

Formats: jpg, png, webp or avif. Any size; the build shrinks covers to
thumbnails. Records without a cover show a placeholder. An image that doesn't
match any record shows a warning during the build.
