// utils.js

export const refreshScreenByScrollDown = async (driver) => {
  const { width, height } = await driver.getWindowSize();
  const anchorPercentage = 50;
  const startPointPercentage = 30;
  const endPointPercentage = 80;

  const anchor = (width * anchorPercentage) / 100;
  const startPoint = (height * startPointPercentage) / 100;
  const endPoint = (height * endPointPercentage) / 100;

  await driver.performActions([
    {
      type: "pointer",
      id: "finger1",
      parameters: { pointerType: "touch" },
      actions: [
        { type: "pointerMove", duration: 0, x: anchor, y: startPoint },
        { type: "pointerDown", button: 0 },
        { type: "pause", duration: 1000 },
        {
          type: "pointerMove",
          duration: 1000,
          origin: "pointer",
          x: 0,
          y: endPoint - startPoint,
        },
        { type: "pointerUp", button: 0 },
      ],
    },
  ]);


  await driver.pause(3000);
};


export const scrollUp = async (driver) => {
  const { width, height } = await driver.getWindowSize();
  const anchorPercentage = 50;
  const startPointPercentage = 90; // Starting near the bottom
  const endPointPercentage = 10; // Ending near the top

  const anchor = (width * anchorPercentage) / 100;
  const startPoint = (height * startPointPercentage) / 100;
  const endPoint = (height * endPointPercentage) / 100;

  await driver.performActions([
    {
      type: "pointer",
      id: "finger1",
      parameters: { pointerType: "touch" },
      actions: [
        { type: "pointerMove", duration: 0, x: anchor, y: startPoint }, // Start near the bottom
        { type: "pointerDown", button: 0 },
        { type: "pause", duration: 1000 },
        {
          type: "pointerMove",
          duration: 1000,
          origin: "pointer",
          x: 0,
          y: endPoint - startPoint, // Move upwards
        },
        { type: "pointerUp", button: 0 },
      ],
    },
  ]);

  await driver.pause(3000);
};


