
/*
  We are rendering `<Application />` down below, so we need React.createElement
*/
import React from "react";

/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import { render, waitForElement, fireEvent } from "@testing-library/react";

/*
  We import the component that we are testing
*/
import Application from "components/Application";
import Appointment from "../Appointment/index";

// it should output a more helpful representation of the DOM tree
import prettyDOM from "@testing-library/react";

// import getByText (-> second method)
import { getByText, getAllByTestId, getByAltText, getByPlaceholderText, queryByText } from "@testing-library/react";


describe("Appointment", () => {
  /*
  A test that renders a React Component
  */
  // it("renders without crashing", () => {
  //   render(<Application />);
  // });

  it("renders without crashing", () => {
    render(<Appointment />);
  });

  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  test.skip("does something it is supposed to do", () => {
    // ...
  });

  test.skip("does something else it is supposed to do", () => {
    // ...
  });

  // debug
  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    //debug
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

});


// xit("does something it is supposed to do", () => {
//   // ...
// });

// test.skip("does something else it is supposed to do", () => {
//   // ...
// });