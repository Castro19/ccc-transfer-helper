// import React, { useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PDFInputField from "./PDFInputField";
const PDFCard = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Upload your PDF Schedule</CardTitle>
        </CardHeader>
        <CardDescription>
          Upload your current schedule to automatically fill the next page with
          your classes!
        </CardDescription>
        <div className=" w-10/12 mx-auto justify-center mb-4">
          <PDFInputField />
          <Button> Submit PDF</Button>
        </div>
      </Card>
    </div>
  );
};

export default PDFCard;
