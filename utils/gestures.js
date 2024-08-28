
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

export const scrollUpInOdk = async (driver) => {
  try {
    const { width, height } = await driver.getWindowSize();

    const startX = width / 2; // Middle of the screen horizontally
    const startY = height * 0.5; // Middle of the screen vertically
    const endX = startX; // Keep the x-coordinate the same
    const endY = height * 0.2; // End closer to the top of the screen

    // Define the scroll area to cover the full screen
    const scrollArea = {
      left: 0, // Start at the left edge
      top: 0,  // Start at the top edge
      width: width, // Full width of the screen
      height: height, // Full height of the screen
    };

    // Perform the scroll gesture
    await driver.execute('mobile: scrollGesture', {
      direction: 'up',
      startX: startX,
      startY: startY,
      endX: endX,
      endY: endY,
      percent: 0.5, // Scroll by 50% of the screen height
      left: scrollArea.left,
      top: scrollArea.top,
      width: scrollArea.width,
      height: scrollArea.height,
      speed: 1000, // Optional: speed of the scroll gesture
    });

    await driver.pause(2000); // Optional pause to allow the screen to settle

  } catch (error) {
    console.error('Error while performing scroll gesture:', error.message);
  }
};


/**
 * Performs a swipe gesture on the screen.
 *
 * @param {WebDriver} driver - The WebDriver instance.
 * @param {number} startX - The starting X coordinate for the swipe.
 * @param {number} startY - The starting Y coordinate for the swipe.
 * @param {number} endX - The ending X coordinate for the swipe.
 * @param {number} endY - The ending Y coordinate for the swipe.
 * @param {number} duration - The duration of the swipe in milliseconds.
 */
export const performSwipe = async (driver, startX, startY, endX, endY, duration = 500) => {
  const actions = {
    type: 'pointer',
    id: 'finger1',
    parameters: { pointerType: 'touch' },
    actions: [
      {
        type: 'pointerMove',
        duration: 0,
        x: startX,
        y: startY,
        origin: 'viewport'
      },
      {
        type: 'pointerDown',
        button: 0
      },
      {
        type: 'pointerMove',
        duration: duration,
        x: endX,
        y: endY,
        origin: 'viewport'
      },
      {
        type: 'pointerUp',
        button: 0
      }
    ]
  };

  try {
    await driver.performActions([actions]);
    await driver.releaseActions();
  } catch (error) {
    console.error('Error while performing swipe action:', error.message);
  }
};



