import { SearchIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

interface SearchProps {
  filterText: string;
  onFilterTextChange: (text: string) => void;
}

const HomeSearchWithFilters = ({
  filterText,
  onFilterTextChange,
}: SearchProps) => {
  const { control } = useForm({
    defaultValues: {
      filterText: filterText,
    },
  });

  const [displayedPlaceholder, setDisplayedPlaceholder] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);

  const placeholders = [
    "Find restaurants nearby",
    "Search for cafes...",
    "Looking for bars?",
    "Find best pizza places",
  ];

  useEffect(() => {
    const typingSpeed = 100; // typing speed (ms)
    const deletingSpeed = 50; // deleting speed (ms)
    const pauseBetween = 2000; // pause between placeholders (ms)

    let timeout: number; // Changed from NodeJS.Timeout to number
    const currentPhrase = placeholders[currentPlaceholderIndex];

    if (currentIndex <= currentPhrase.length) {
      // Typing effect
      timeout = window.setTimeout(() => {
        setDisplayedPlaceholder(currentPhrase.substring(0, currentIndex));
        setCurrentIndex(currentIndex + 1);
      }, typingSpeed);
    } else if (
      currentIndex >
      currentPhrase.length + pauseBetween / typingSpeed
    ) {
      // Deleting effect
      timeout = window.setTimeout(() => {
        if (displayedPlaceholder.length > 0) {
          setDisplayedPlaceholder(
            displayedPlaceholder.substring(0, displayedPlaceholder.length - 1)
          );
        } else {
          // Move to next placeholder
          setCurrentPlaceholderIndex(
            (currentPlaceholderIndex + 1) % placeholders.length
          );
          setCurrentIndex(0);
        }
      }, deletingSpeed);
    } else {
      // Pause between placeholders
      timeout = window.setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, typingSpeed);
    }

    return () => window.clearTimeout(timeout);
  }, [currentIndex, currentPlaceholderIndex, displayedPlaceholder]);

  return (
    <Controller
      name="filterText"
      control={control}
      defaultValue={filterText}
      render={({ field: { onChange, value } }) => (
        <Input
          variant="rounded"
          size="lg"
          isDisabled={false}
          isRequired={true}
          isReadOnly={false}
        >
          <InputField
            type="text"
            placeholder={displayedPlaceholder}
            value={value}
            onChangeText={(text) => {
              onChange(text);
              onFilterTextChange(text);
            }}
          />
          <InputSlot style={{ paddingRight: 16 }}>
            <InputIcon as={SearchIcon}></InputIcon>
          </InputSlot>
        </Input>
      )}
    />
  );
};

export default HomeSearchWithFilters;
