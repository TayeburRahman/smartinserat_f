import React, {useState, useCallback} from "react";
import { Textarea, Input } from "@windmill/react-ui";
export const LimitedTextarea = ({ value, limit, setForm, t, name }) => {
    const [content, setContent] = useState(value.slice(0, limit));
    const setFormattedContent = useCallback(
      text => {
        setContent(text.slice(0, limit));
      },
      [limit, setContent]
    );
    return (
      <>
        <Textarea
          onChange={event => setFormattedContent(event.target.value)}
          className="mt-1"
          valid
          rows="3"
          value={content}
          onInput={setForm}
          name={name}
          placeholder={t("enter description of the property")}
        />
        <p className="text-right">
          {content.length}/{limit}
        </p>
      </>
    );
};
export const LimitedInput = ({ value, limit, setForm, t }) => {
    const [content, setContent] = useState(value.slice(0, limit));
    const setFormattedContent = useCallback(
      text => {
        setContent(text.slice(0, limit));
      },
      [limit, setContent]
    );
    return (
      <>
        <Input
          onChange={event => setFormattedContent(event.target.value)}
          type="text"
          className="mb-2 mt-1"
          required={true}
          label="Listing Title"
          placeholder={t("enter your listing title")}
          name="listingTitle"
          value={content}
          onInput={setForm}
          margin="normal"
          variant="outlined"
          autoComplete="off"
          fullwidth='true'
        />
        <p className="text-right">
          {content.length}/{limit}
        </p>
      </>
    );
};