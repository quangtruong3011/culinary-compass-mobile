import { Icon, SearchIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

interface SearchProps {
  filterText: string;
  onFilterTextChange: (text: string) => void;
}

const Search = ({ filterText, onFilterTextChange }: SearchProps) => {
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
    const typingSpeed = 100; // tốc độ gõ (ms)
    const deletingSpeed = 50; // tốc độ xóa (ms)
    const pauseBetween = 2000; // thời gian dừng giữa các placeholder (ms)

    let timeout: NodeJS.Timeout;
    const currentPhrase = placeholders[currentPlaceholderIndex];

    if (currentIndex <= currentPhrase.length) {
      // Hiệu ứng gõ chữ
      timeout = setTimeout(() => {
        setDisplayedPlaceholder(currentPhrase.substring(0, currentIndex));
        setCurrentIndex(currentIndex + 1);
      }, typingSpeed);
    } else if (
      currentIndex >
      currentPhrase.length + pauseBetween / typingSpeed
    ) {
      // Hiệu ứng xóa chữ
      timeout = setTimeout(() => {
        if (displayedPlaceholder.length > 0) {
          setDisplayedPlaceholder(
            displayedPlaceholder.substring(0, displayedPlaceholder.length - 1)
          );
        } else {
          // Chuyển sang placeholder tiếp theo
          setCurrentPlaceholderIndex(
            (currentPlaceholderIndex + 1) % placeholders.length
          );
          setCurrentIndex(0);
        }
      }, deletingSpeed);
    } else {
      // Dừng giữa các placeholder
      timeout = setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, typingSpeed);
    }

    return () => clearTimeout(timeout);
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
          <InputSlot className="pr-3">
            <InputIcon>
              <Icon as={SearchIcon} size="sm" />
            </InputIcon>
          </InputSlot>
        </Input>
      )}
    />
  );
};

export default Search;
