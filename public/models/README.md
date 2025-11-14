# 3D Crop Models

This folder is for storing realistic 3D crop models in GLB format.

## How to Add Your Own Models

1. Download free GLB models from:
   - **Poly Pizza**: https://poly.pizza/m/lPspzfC8Pu (Wheat), https://poly.pizza/m/5PEyOwPaKlg (Corn)
   - **Sketchfab**: https://sketchfab.com/tags/wheat (filter by "Downloadable" and "CC0/CC-BY")
   - **Quaternius**: https://quaternius.com/packs/ultimatecrops.html

2. Place the .glb files in this folder with names:
   - `wheat.glb`
   - `corn.glb`
   - `rice.glb`

3. The Hero component will automatically load these models instead of procedural ones.

## License

Make sure any models you download are CC0 (Public Domain) or CC-BY (Attribution) licensed for commercial use.

## Recommended Model Properties

- **Format**: GLB (not GLTF with separate files)
- **Size**: < 5MB per model
- **Triangles**: < 10,000 for performance
- **Textures**: Embedded in GLB file
