import React from "react";

import PageTitle from "../components/Typography/PageTitle";
import SectionTitle from "../components/Typography/SectionTitle";
import { Input, HelperText, Label, Select, Textarea } from "@windmill/react-ui";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import { MailIcon } from "../icons";

function Forms() {
  return (
    <>
      <PageTitle>Forms</PageTitle>
      <SectionTitle>Elements</SectionTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <Label>
          <span>Name</span>
          <Input className="mt-1" placeholder="Jane Doe" />
        </Label>

        <Label className="mt-4">
          <span>Disabled</span>
          <Input disabled className="mt-1" placeholder="Jane Doe" />
        </Label>

        <div className="mt-4">
          {/* TODO: Check if this label is accessible, or fallback */}
          {/* <span className="text-sm text-gray-700 dark:text-gray-400">Account Type</span> */}
          <Label>Account Type</Label>
          <div className="mt-2">
            <Label radio>
              <Input type="radio" value="personal" name="accountType" />
              <span className="ml-2">Personal</span>
            </Label>
            <Label className="ml-6" radio>
              <Input type="radio" value="business" name="accountType" />
              <span className="ml-2">Business</span>
            </Label>
            <Label disabled className="ml-6" radio>
              <Input
                disabled
                type="radio"
                value="disabled"
                name="accountType"
              />
              <span className="ml-2">Disabled</span>
            </Label>
          </div>
        </div>

        <Label className="mt-4">
          <span>Requested Limit</span>
          <Select className="mt-1">
            <option>$1,000</option>
            <option>$5,000</option>
            <option>$10,000</option>
            <option>$25,000</option>
          </Select>
        </Label>

        <Label className="mt-4">
          <span>Multiselect</span>
          <Select className="mt-1" multiple>
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
            <option>Option 4</option>
            <option>Option 5</option>
          </Select>
        </Label>

        <Label className="mt-4">
          <span>Message</span>
          <Textarea
            className="mt-1"
            rows="3"
            placeholder="Enter some long form content."
          />
        </Label>

        <Label className="mt-6" check>
          <Input type="checkbox" />
          <span className="ml-2">
            I agree to the <span className="underline">privacy policy</span>
          </span>
        </Label>
      </div>

      <SectionTitle>Checkout</SectionTitle>
      <div className="px-4 py-3 mb-8 bg-white block rounded-lg shadow-md dark:bg-gray-800">
        <Tabs>
          <TabList>
            <Tab>
              <div className="block">
                <Label className="block" radio>
                  <Input
                    className="block"
                    type="radio"
                    value="personal"
                    name="accountType"
                  />
                  <span className="ml-2 block">Credit Card</span>
                </Label>
              </div>
            </Tab>
            <Tab>
              <div className="block">
                <Label className="block" radio>
                  <Input
                    className="block"
                    type="radio"
                    value="personal"
                    name="accountType"
                  />
                  <span className="ml-2 block">Paypal</span>
                </Label>
              </div>
            </Tab>
            <Tab>
              <div className="block">
                <Label className="block" radio>
                  <Input
                    className="block"
                    type="radio"
                    value="personal"
                    name="accountType"
                  />
                  <span className="ml-2 block">SEPA-Lastschrift</span>
                </Label>
              </div>
            </Tab>
            <Tab>
              <div className="block">
                <Label className="block" radio>
                  <Input
                    className="block"
                    type="radio"
                    value="personal"
                    name="accountType"
                  />
                  <span className="ml-2 block">Apple Pay</span>
                </Label>
              </div>
            </Tab>
          </TabList>
          <TabPanel className="mt-5">
            <div>CreditCardForm</div>
          </TabPanel>
          <TabPanel className="mt-5">
            <div>PayPalForm</div>
          </TabPanel>
          <TabPanel className="mt-5">
            <div>SEPA Form</div>
          </TabPanel>
          <TabPanel className="my-5">
            <div>Apple Pay</div>
          </TabPanel>
        </Tabs>
      </div>

      <SectionTitle>Validation</SectionTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <Label>
          <span>Invalid input</span>
          <Input className="mt-1" valid={false} placeholder="Jane Doe" />
          <HelperText valid={false}>Your password is too short.</HelperText>
        </Label>

        <Label className="mt-4">
          <span>Valid input</span>
          <Input className="mt-1" valid={true} placeholder="Jane Doe" />
          <HelperText valid={true}>Your password is strong.</HelperText>
        </Label>

        <Label className="mt-4">
          <span>Helper text</span>
          <Input className="mt-1" placeholder="Jane Doe" />
          <HelperText>
            Your password must be at least 6 characters long.
          </HelperText>
        </Label>
      </div>

      {/* <!-- Inputs with icons --> */}
      <SectionTitle>Icons</SectionTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <Label>
          <span>Icon left</span>
          {/* <!-- focus-within sets the color for the icon when input is focused --> */}
          <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
            <Input
              className="mt-1 pl-10 text-black dark:text-gray-300"
              placeholder="Jane Doe"
            />
            <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
              <MailIcon className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>
        </Label>

        <Label className="mt-4">
          <span className="text-gray-700 dark:text-gray-400">Icon right</span>
          {/* <!-- focus-within sets the color for the icon when input is focused --> */}
          <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
            <Input
              className="mt-1 pr-10 text-black dark:text-gray-300"
              placeholder="Jane Doe"
            />
            <div className="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none">
              <MailIcon className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>
        </Label>
      </div>

      {/* <!-- Inputs with buttons --> */}
      <SectionTitle>Buttons</SectionTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <Label>
          <span>Button left</span>
          <div className="relative">
            <Input className="mt-1 pl-20" placeholder="Jane Doe" />
            <button className="absolute inset-y-0 px-4 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-l-md active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray">
              Click
            </button>
          </div>
        </Label>

        <Label className="mt-4">
          <span>Button right</span>
          <div className="relative">
            <Input className="mt-1 pr-20" placeholder="Jane Doe" />
            <button className="absolute inset-y-0 right-0 px-4 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-r-md active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
              Click
            </button>
          </div>
        </Label>
      </div>
    </>
  );
}

export default Forms;