import React from "react";
import PageTitle from "../components/Typography/PageTitle";
import FaqItem from "../components/FAQ/FAQ";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Card,
  CardBody,
} from "@windmill/react-ui";
// import "react-tabs/style/react-tabs-faq.css";
import "../components/FAQ/style.css"
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { dictionary } from "../resources/multiLanguages";

function SetTitleTag() {
  return (
    <Helmet>
      <title>FAQ - Smartinserat</title>
    </Helmet>
  )
}

function Faq() {
  const Mailto = ({ email, subject = "", body = "", children }) => {
    let params = subject || body ? "?" : "";
    if (subject) params += `subject=${encodeURIComponent(subject)}`;
    if (body) params += `${subject ? "&" : ""}body=${encodeURIComponent(body)}`;

    return <a href={`mailto:${email}${params}`}>{children}</a>;
  };
  const { t } = useTranslation()
  const languageReducer = "de";

  return (
    <>
      <SetTitleTag />
      <PageTitle>{dictionary["help"][languageReducer]["title"]}</PageTitle>
      <div className="flex flex-wrap -mx-2 overflow-hidden dark:text-gray-200">
        <Tabs className="block md:flex w-full">
          <TabList className="w-full md:w-1/5">
            <div className="my-2 px-2 overflow-hidden">
              <TableContainer>
                <Table>
                  <TableBody>
                    <Tab className="cursor-pointer hover:bg-gray-100">
                      <TableRow>
                        <TableCell>{dictionary["help"][languageReducer]["account"]}</TableCell>
                      </TableRow>
                    </Tab>
                    <Tab className="cursor-pointer hover:bg-gray-100">
                      <TableRow>
                        <TableCell>{dictionary["help"][languageReducer]["listings"]}</TableCell>
                      </TableRow>
                    </Tab>
                    <Tab className="cursor-pointer hover:bg-gray-100">
                      <TableRow>
                        <TableCell>{dictionary["help"][languageReducer]["payment"]}</TableCell>
                      </TableRow>
                    </Tab>
                    <Tab className="cursor-pointer hover:bg-gray-100">
                      <TableRow>
                        <TableCell>{dictionary["help"][languageReducer]["others"]}</TableCell>
                      </TableRow>
                    </Tab>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </TabList>
          <div className="my-2 w-full px-2 overflow-hidden">
            <TabPanel>
              <Card>
                <CardBody className="p-6">
                  <FaqItem
                    title={dictionary["faqContent"][languageReducer]["account"]["title"]}
                    description={dictionary["faqContent"][languageReducer]["account"]["description"]}
                    questions={dictionary["faqContent"][languageReducer]["account"]["questions"]}

                  />
                </CardBody>
              </Card>
            </TabPanel>
            <TabPanel>
              <Card>
                <CardBody className="p-6">
                  <FaqItem
                    title={dictionary["faqContent"][languageReducer]["listings"]["title"]}
                    description={dictionary["faqContent"][languageReducer]["listings"]["description"]}
                    questions={dictionary["faqContent"][languageReducer]["listings"]["questions"]}

                  />
                </CardBody>
              </Card>
            </TabPanel>
            <TabPanel>
              <Card>
                <CardBody className="p-6">
                  <FaqItem
                    title={dictionary["faqContent"][languageReducer]["payment"]["title"]}
                    description={dictionary["faqContent"][languageReducer]["payment"]["description"]}
                    questions={dictionary["faqContent"][languageReducer]["payment"]["questions"]}

                  />
                </CardBody>
              </Card>
            </TabPanel>
            <TabPanel>
              <Card>
                <CardBody className="p-6">
                  <FaqItem
                    title={dictionary["faqContent"][languageReducer]["others"]["title"]}
                    description={dictionary["faqContent"][languageReducer]["others"]["description"]}
                    questions={dictionary["faqContent"][languageReducer]["others"]["questions"]}

                  />
                </CardBody>
              </Card>
            </TabPanel>
          </div>
        </Tabs>
      </div>

      <div className="md:flex block flex-wrap -mx-2 overflow-hidden my-6 dark:text-gray-200">
        <div className="my-2 px-2 w-full md:w-1/2 overflow-hidden">
          <Card className="flex mb-8">
            <CardBody>
              {/* <Badge type="neutral">{dictionary["help"][languageReducer]["contactHours"]}</Badge> */}
              <p className="text-xl my-4 font-semibold text-gray-600 dark:text-gray-300">
                {dictionary["help"][languageReducer]["directPhoneSupport"]}
              </p>
              <p className="my-4 text-gray-600 dark:text-gray-400">
                {dictionary["help"][languageReducer]["callForFree"]}
              </p>
              <p className="mt-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
                <a href='tel:053618344731'>053618344731</a>
              </p>
            </CardBody>
          </Card>
        </div>

        <div className="my-2 px-2 w-full md:w-1/2 overflow-hidden">
          <Card className="flex mb-8">
            <CardBody>
              {/* <Badge type="neutral">{dictionary["help"][languageReducer]["alwaysActive"]}</Badge> */}
              <p className="text-xl my-4 font-semibold text-gray-600 dark:text-gray-300">
                {dictionary["help"][languageReducer]["questionsOrProblems"]}
              </p>
              <p className="my-4 text-gray-600 dark:text-gray-400">
                {dictionary["help"][languageReducer]["sendEmail"]}
              </p>
              <p className="mt-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
                <Mailto
                  email="info@Smartinserat.de"
                  subject="Problem mit ..."
                  body={dictionary["faq"][languageReducer]["helloProblem"]}
                >
                  info@Smartinserat.de
                </Mailto>
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Faq;