// Mapping of all local image assets extracted from Sketch
export const appImages = {
  // Named aliases
  authHero: require('./b55dac2553d42721d23f4af9986628a0ceb85424.png'),
  mapTracking: require('./9f5bb826b2776f97a9a3c4d0e5a3d0f845b857ae.png'),
  paytmLogo: require('./f09ec7b664239421028c35cf45de65f845e595d8.png'),
  agentAvatar: require('./bcf8c79bf953ed02fd7897a95abe42caa41959ce.png'),
  userProfile: require('./0e668540fa875b704c56f2478c355783c5df073b.png'),
  polygon: require('./112facab1d34cb9a75b77434308d8228b47e5e20.png'),
  
  // Food items & kitchens
  manchurian: require('./a3058c88ecef700cc80bc13abafbeb632f2f8f51.png'),
  beverages: require('./b4450cc207b6e3fc693ebeb50628e84b9d76d512.png'),
  appetizer: require('./a430d71aafa3c1cb2beba885e536dddee11b8df8.png'),
  bowlCurry: require('./06ab777a7cf67f6d780d66416b91d7d70ffafc21.png'),
  phulkaBread: require('./ae9b7d443504bb006fa43bf3149fdf0c4f740282.png'),
  cookingCloseUp: require('./44c912c030ef80e31fe1ace04ae990f81d3a7d23.png'),
  spicesAnise: require('./9a70a24452177942a23498e8b117382e411669bf.png'),

  // Direct hash lookups
  'b55dac2553d42721d23f4af9986628a0ceb85424': require('./b55dac2553d42721d23f4af9986628a0ceb85424.png'),
  '9f5bb826b2776f97a9a3c4d0e5a3d0f845b857ae': require('./9f5bb826b2776f97a9a3c4d0e5a3d0f845b857ae.png'),
  'f09ec7b664239421028c35cf45de65f845e595d8': require('./f09ec7b664239421028c35cf45de65f845e595d8.png'),
  'bcf8c79bf953ed02fd7897a95abe42caa41959ce': require('./bcf8c79bf953ed02fd7897a95abe42caa41959ce.png'),
  '0e668540fa875b704c56f2478c355783c5df073b': require('./0e668540fa875b704c56f2478c355783c5df073b.png'),
  '112facab1d34cb9a75b77434308d8228b47e5e20': require('./112facab1d34cb9a75b77434308d8228b47e5e20.png'),
  'a3058c88ecef700cc80bc13abafbeb632f2f8f51': require('./a3058c88ecef700cc80bc13abafbeb632f2f8f51.png'),
  'b4450cc207b6e3fc693ebeb50628e84b9d76d512': require('./b4450cc207b6e3fc693ebeb50628e84b9d76d512.png'),
  'a430d71aafa3c1cb2beba885e536dddee11b8df8': require('./a430d71aafa3c1cb2beba885e536dddee11b8df8.png'),
  '06ab777a7cf67f6d780d66416b91d7d70ffafc21': require('./06ab777a7cf67f6d780d66416b91d7d70ffafc21.png'),
  'ae9b7d443504bb006fa43bf3149fdf0c4f740282': require('./ae9b7d443504bb006fa43bf3149fdf0c4f740282.png'),
  '44c912c030ef80e31fe1ace04ae990f81d3a7d23': require('./44c912c030ef80e31fe1ace04ae990f81d3a7d23.png'),
  '9a70a24452177942a23498e8b117382e411669bf': require('./9a70a24452177942a23498e8b117382e411669bf.png'),

  // Semantic Sketch layer name lookups
  'cooking-cuisine-delicious-941869': require('./a3058c88ecef700cc80bc13abafbeb632f2f8f51.png'),
  'beverages-brunch-cocktail-5317': require('./b4450cc207b6e3fc693ebeb50628e84b9d76d512.png'),
  'appetizer-breakfast-cuisine-326278': require('./a430d71aafa3c1cb2beba885e536dddee11b8df8.png'),
  'bowl-close-up-cuisine-1320917': require('./06ab777a7cf67f6d780d66416b91d7d70ffafc21.png'),
  'adult-blur-bread-351706': require('./ae9b7d443504bb006fa43bf3149fdf0c4f740282.png'),
  'close-up-cooking-cuisine-958545': require('./44c912c030ef80e31fe1ace04ae990f81d3a7d23.png'),
  'anise-aroma-art-277253': require('./9a70a24452177942a23498e8b117382e411669bf.png'),
};

export const resolveFoodImage = (imgKey) => {
  if (!imgKey) return appImages.manchurian;
  if (appImages[imgKey]) return appImages[imgKey];
  return { uri: imgKey };
};
