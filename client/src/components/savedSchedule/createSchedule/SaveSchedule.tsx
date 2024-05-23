import { useAuth } from "@/contexts/authContext";
import { SemesterType } from "@/types";
import { Params, useNavigate } from "react-router-dom";

// Toast
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useRef, useState } from "react";
import { postSchedule, deleteScheduleById } from "../crudSchedule";

import styles from "./SaveSchedule.module.css";

interface SaveScheduleProps {
  schedule: SemesterType[];
  params: Readonly<Params<string>>;
}

const SaveSchedule = ({ schedule, params }: SaveScheduleProps): JSX.Element => {
  const navigate = useNavigate();
  const [newScheduleSaved, setNewScheduleSaved] = useState<string | null>();
  const newScheduleSavedRef = useRef(newScheduleSaved);

  const { currentUser } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    newScheduleSavedRef.current = newScheduleSaved;
  }, [newScheduleSaved]);

  const goToRegister = async () => {
    navigate("/register/login");
  };

  const deleteSchedule = async () => {
    const responseData = await deleteScheduleById(newScheduleSavedRef.current);
    console.log("ResponseDATA: ", responseData);
  };

  const handleSaveSchedule = async () => {
    console.log(
      `SAVING SCHEDULE ${schedule} for ${currentUser?.uid} with params: ${params}`
    );
    const responseData = await postSchedule(currentUser?.uid, schedule, params);
    console.log("POST SCHEDULE RESPONSE: ", responseData.scheduleId);
    setNewScheduleSaved(responseData.scheduleId);

    if (currentUser) {
      toast({
        title: "Scheduled Added",
        description: `Schedule transferring from ${params.ccc} to ${params.college} with the major ${params.major} is saved!`,
        action: (
          <ToastAction onClick={deleteSchedule} altText="Delete Schedule">
            Undo
          </ToastAction>
        ),
      });
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! User is not logged in.",
        description: responseData.message,
        action: (
          <ToastAction onClick={goToRegister} altText="Go Login">
            Go Login
          </ToastAction>
        ),
      });
    }
  };
  return (
    <>
      <Button className={styles.but} onClick={handleSaveSchedule}>
        Save Schedule
      </Button>
    </>
  );
};

export default SaveSchedule;
