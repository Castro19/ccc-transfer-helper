import { HoverEffect } from "@/components/ui/card-hover-effect";
import { semesters } from "@/types";

export default function SemesterCards({ data }: { data: any }) {
  console.log("SCHEDULED DATA: ", data);

  return (
    <div className=" flex justify-center w-full">
      <HoverEffect semesters={semesters} />
    </div>
  );
}
