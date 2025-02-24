import * as tf from "@tensorflow/tfjs";

let model;

export const trainDynamicModel = async (setModel, userData) => {
  model = tf.sequential();
  model.add(tf.layers.dense({ units: 16, inputShape: [2], activation: "relu" }));
  model.add(tf.layers.dense({ units: 1 }));

  model.compile({ optimizer: "adam", loss: "meanSquaredError" });

  if (userData.length > 0) {
    const vx = userData.map((d) => d.vx);
    const vy = userData.map((d) => d.vy);
    const landings = userData.map((d) => d.landing);

    const xs = tf.tensor2d(vx.map((v, i) => [v, vy[i]]));
    const ys = tf.tensor2d(landings, [landings.length, 1]);

    await model.fit(xs, ys, { epochs: 50 });
  }

  setModel(model);
};

// ✅ Fix: Ensure predictLanding is properly exported
export const predictLanding = async (model, vx, vy) => {
  if (!model) return null;
  const inputTensor = tf.tensor2d([[vx, vy]]);
  const outputTensor = model.predict(inputTensor);
  const outputArray = await outputTensor.data();
  return outputArray[0];  // AI-predicted landing position
};

// ✅ Fix: Ensure suggestBetterLaunch is properly exported
export const suggestBetterLaunch = async (vx, vy) => {
  if (!model) return { suggestedVx: vx, suggestedVy: vy }; // Default to current input

  const inputTensor = tf.tensor2d([[vx, vy]]);
  const outputTensor = model.predict(inputTensor);
  const outputArray = await outputTensor.data();
  
  return {
    suggestedVx: vx + (Math.random() * 2 - 1),  // Slight tweak in velocity
    suggestedVy: vy + (Math.random() * 2 - 1)   // Slight tweak in angle
  };
};
