import React, { useState } from "react";
import type { FormEvent } from "react";
import PrimaryButton from "../elements/PrimaryButton";
import TextInput from "../elements/TextInput";
import TextArea from "../elements/TextArea";

type Props = {
  submitForm: (name: string, description: string) => void;
  initialName?: string;
  initialDescription?: string | null;
};

const DeckForm = ({ submitForm, initialName, initialDescription }: Props) => {
  const [name, setName] = useState(initialName || "");
  const [description, setDescription] = useState(initialDescription || "");

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        submitForm(name, description);
      }}
    >
      <TextInput
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Deck title..."
        required
      />
      <TextArea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Deck description..."
      />
      <PrimaryButton submit>Save Deck</PrimaryButton>
    </form>
  );
};

export default DeckForm;
