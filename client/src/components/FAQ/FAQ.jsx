import React from "react";
import SectionTitle from "../Typography/SectionTitle";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "../FAQ/style.css";

function FaqItem({ title, description, questions }) {
  return (
    <Accordion
    className="text-md font-regular bg-white"
    allowZeroExpanded="true"
  >
    <SectionTitle>{title}</SectionTitle>
    <p className="my-3">
     {description}
    </p>
    {
      questions.map((item) => (
        <AccordionItem>
      <AccordionItemHeading>
        <AccordionItemButton>
          {item.question}
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel>
        <p className="font-light">
          {item.answer}
        </p>
      </AccordionItemPanel>
    </AccordionItem>
      ))
    }
  </Accordion>
  );
}

export default FaqItem;
