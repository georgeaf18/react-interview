import { render, screen, fireEvent, getTestById } from '@testing-library/react';
import App from './App';
import Enzyme, { shallow, mount } from 'enzyme';

test('renders text', () => {
  render(<App />);
  const textElement = screen.getByText(/Activity Tracker/i);
  expect(textElement).toBeInTheDocument();
});

describe("App.js", () => {
  const onFunction = jest.fn();
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<App />);
  })

  it('renders', () => {
    expect(wrapper).not.toBeNull()
  })

  it('saves and deletes activeActivity and updates activities', () => {
    const startButton = wrapper.find('.startButton')
    const input = wrapper.find('.main-input').instance();

    expect(window.sessionStorage.getItem("activeActivity")).toBe("null")

    expect(startButton).not.toBeNull();
    expect(input).not.toBeNull()

    input.value = "washing dishes"
    startButton.at(0).simulate("click")

    const activeActivity = JSON.parse(window.sessionStorage.getItem("activeActivity"));
    const activities = JSON.parse(window.sessionStorage.getItem("activities"));

    expect(activeActivity).not.toBe("null")
    expect(activeActivity.description).toBe("washing dishes")
    expect(activities.length).toBe(1);



    const endButton = wrapper.find('.endButton');
    expect(endButton).not.toBeNull();
    endButton.at(0).simulate("click");
    expect(window.sessionStorage.getItem("activeActivity")).toBe("null")
    expect(activities.length).toBe(1);
  })
})


