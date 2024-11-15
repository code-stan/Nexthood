import { useNavigate } from "react-router-dom";
import { events as eventModel } from "declarations/events";
import { Dispatch, SetStateAction, useState } from "react";
import Spinner from "./Spinner";

// Availabel function
// eventManager.createEvent(id, name, description, date as text, time as text) ;
// getEvent(id);
// getAllEvents();

type creatEvtProps = {
  setIsModalActive: Dispatch<SetStateAction<boolean>>;
  handleSubmitEvent: () => void;
};

const CreateEventForm = ({
  setIsModalActive,
  handleSubmitEvent,
}: creatEvtProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    date: "",
    time: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsLoading(true);

    try {
      let response = await eventModel.createEvent(
        JSON.stringify(generateUniqueID()),
        JSON.stringify(formData.name),
        JSON.stringify(formData.description),
        JSON.stringify(formData.date),
        JSON.stringify(formData.time)
      );

      // Redirect to the /events page after the event is created
      navigate("/events");
      alert(response);
    } catch (error) {
      console.error("Error creating event:", error);
      navigate("/dashboard");
      // Optionally, handle error display here
    } finally {
      setIsLoading(false);
    }
  };

  // Replace this with a proper unique ID generation logic
  const generateUniqueID = () => {
    return crypto.randomUUID();
  };

  // await events.createEvent("1593a13e-3d52-4225-9078-70dc24f4ea40", "Very First Event", "This is my first event. It is used to test this functionality. I hope it works.", "Tomorrow", "13:00");
  // let evet = await events.displayAllEvents();
  return (
    <form onSubmit={handleSubmit} className="">
      <label htmlFor="">
        <input
          type="text"
          name="name"
          value={formData.name}
          className="createEvent w-full"
          placeholder="Event Name"
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="">
        <input
          type="text"
          name="description"
          value={formData.description}
          className="createEvent w-full"
          placeholder="Event Description"
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="">
        <input
          type="date"
          name="date"
          value={formData.date}
          className="createEvent w-full"
          placeholder="Event Date"
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="">
        <input
          type="time"
          name="time"
          value={formData.time}
          className="createEvent w-full"
          placeholder="Event Time"
          onChange={handleChange}
        />
      </label>
      {/* <p>{JSON.stringify(evet)}</p> */}
      <div className="mt-4 flex justify-center items-center w-full gap-4">
        <button
          onClick={() => setIsModalActive(false)}
          className="border border-red-500 text-red-500 w-1/2 rounded-md py-3 md:py-5 px-4"
        >
          Cancel
        </button>
        {!isLoading && (
          <button
            onClick={handleSubmitEvent}
            className="bg-primary text-white rounded-md w-1/2 py-3 md:py-5 px-4"
          >
            Create Event
          </button>
        )}
        {isLoading && <Spinner bg="primary" />}
      </div>
    </form>
  );
};

export default CreateEventForm;
