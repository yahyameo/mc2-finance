// __mocks__/trading-view.js
export default {
    // Mock TradingView widget initialization
    widget: jest.fn().mockImplementation(() => ({
      // Mock the methods you need
      onReady: jest.fn(),
      resize: jest.fn(),
    })),
  };
  