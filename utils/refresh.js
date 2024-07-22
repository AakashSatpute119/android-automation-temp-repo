export const refreshScreenByScrollDown = async (driver) => {
  const { width, height } = await driver.getWindowSize();
  const anchorPercentage = 50;
  const startPointPercentage = 30;
  const endPointPercentage = 80;

  const anchor = (width * anchorPercentage) / 100;
  const startPoint = (height * startPointPercentage) / 100;
  const endPoint = (height * endPointPercentage) / 100;

  await driver.touchAction([
    { action: "press", x: anchor, y: startPoint },
    { action: "wait", ms: 1000 },
    { action: "moveTo", x: anchor, y: endPoint },
    { action: "release" },
  ]);

  // Wait for refresh to complete (adjust time as necessary)
  await driver.pause(3000);
};
