import { render, screen, fireEvent, getTestById } from '@testing-library/react';
import App from './App';
import { mount } from 'enzyme';

test('renders text', () => {
  render(<App />);
  const textElement = screen.getByText(/Activity Tracker/i);
  expect(textElement).toBeInTheDocument();
});

describe("App.js", () => {
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
    let activities = JSON.parse(window.sessionStorage.getItem("activities"));

    expect(activeActivity).not.toBe("null")
    expect(activeActivity.description).toBe("washing dishes")
    expect(activeActivity.start).not.toBe("");
    expect(activeActivity.end).toBe("");
    expect(activities.length).toBe(1);


    expect(activities[0].start).not.toBe("")
    expect(activities[0].end).toBe("")



    const endButton = wrapper.find('.endButton');
    expect(endButton).not.toBeNull();
    endButton.at(0).simulate("click");
    expect(window.sessionStorage.getItem("activeActivity")).toBe("null")
    activities = JSON.parse(window.sessionStorage.getItem("activities"));

    expect(activities.length).toBe(1);
    expect(activities[0].description).toBe("washing dishes")
    expect(activities[0].start).not.toBe("")
    expect(activities[0].end).not.toBe("")

  })
})


