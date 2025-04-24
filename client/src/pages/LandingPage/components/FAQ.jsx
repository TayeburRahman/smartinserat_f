import React from "react";
import { dictionary } from "../../../resources/multiLanguages";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

import "../../../components/FAQ/style.css";

const FAQ = () => {
  const languageReducer = "de";

  return (
    <section className="bg-white w-full mb-16" id="FAQ">
      <div className=" text-center text-gray-600 w-full pb-10">
        <h3 className="text-royalPurple text-1xl sm:text-2xl font-extrabold font-bold uppercase mt-14 mb-3">FAQ</h3>
        <h2 className="text-black text-2xl sm:text-3xl font-extrabold ">
          HÄUFIG GESTELLTE FRAGEN
        </h2>
      </div>
      <div className="flex justify-center items-center text-gray-600 pb-6">
        <div className="max-w-2xl w-full flex flex-col justify-center items-center px-5 xl:px-0 mt-5 ">
          <Accordion 
            className="text-md text-left font-regular w-full md:w-3/4 mx-auto "
            allowZeroExpanded="true"
          >
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton>
                  {dictionary["faq"][languageReducer]["tile1"]["faqTitle"]}
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <p className="font-light">
                  {dictionary["faq"][languageReducer]["tile1"]["faqDescription"]}
                </p>
              </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton>
                  {dictionary["faq"][languageReducer]["tile2"]["faqTitle"]}
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <p className="font-light">
                  {dictionary["faq"][languageReducer]["tile2"]["faqDescription"]}
                </p>
              </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton>
                  {dictionary["faq"][languageReducer]["tile3"]["faqTitle"]}
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <p className="font-light">
                  {dictionary["faq"][languageReducer]["tile3"]["faqDescription"]}
                </p>
              </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton>
                  {dictionary["faq"][languageReducer]["tile4"]["faqTitle"]}
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <p className="font-light">
                  {dictionary["faq"][languageReducer]["tile4"]["faqDescription"]}
                </p>
              </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton>
                  {dictionary["faq"][languageReducer]["tile5"]["faqTitle"]}
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <p className="font-light">
                  {dictionary["faq"][languageReducer]["tile5"]["faqDescription"]}
                </p>
              </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton>
                  {dictionary["faq"][languageReducer]["tile6"]["faqTitle"]}
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <p className="font-light">
                  {dictionary["faq"][languageReducer]["tile6"]["faqDescription"]}
                </p>
              </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton>
                  {dictionary["faq"][languageReducer]["tile7"]["faqTitle"]}
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <p className="font-light">
                  {dictionary["faq"][languageReducer]["tile7"]["faqDescription"]}
                </p>
              </AccordionItemPanel>
            </AccordionItem>
          </Accordion>
        </div>
      </div> 
    </section>
  );
};

export default FAQ;
