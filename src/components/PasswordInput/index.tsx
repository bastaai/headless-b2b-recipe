import { Input } from "@/components/Input";
import { useState } from "react";

export type Props = {
  placeholder: string;
  name: string;
  setValue: any;
  error?: boolean;
  tabIndex?: number;
};

export const PasswordInput = (props: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const closedEye = (
    <svg
      width="16"
      height="14"
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.00008 1L4.39285 3.39277M14.0001 13L11.6075 10.6075M9.24999 11.5497C8.84522 11.6265 8.42749 11.6667 8.00039 11.6667C5.01529 11.6667 2.48842 9.70473 1.63892 6.99998C1.87018 6.26367 2.22575 5.5824 2.68104 4.98079M6.58587 5.58579C6.9478 5.22386 7.4478 5 8.00008 5C9.10465 5 10.0001 5.89543 10.0001 7C10.0001 7.55228 9.77622 8.05229 9.4143 8.41421M6.58587 5.58579L9.4143 8.41421M6.58587 5.58579L4.39285 3.39277M9.4143 8.41421L4.39285 3.39277M9.4143 8.41421L11.6075 10.6075M4.39285 3.39277C5.43274 2.72236 6.67112 2.33333 8.00037 2.33333C10.9855 2.33333 13.5123 4.29528 14.3618 7.00002C13.8906 8.50048 12.9031 9.77234 11.6075 10.6075"
        stroke="#1F1F5C"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const openEye = (
    <svg
      width="16"
      height="12"
      viewBox="0 0 16 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.0001 5.99998C10.0001 7.10455 9.10465 7.99998 8.00008 7.99998C6.89551 7.99998 6.00008 7.10455 6.00008 5.99998C6.00008 4.89541 6.89551 3.99998 8.00008 3.99998C9.10465 3.99998 10.0001 4.89541 10.0001 5.99998Z"
        stroke="#1F1F5C"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.63892 5.99996C2.48843 3.29523 5.01529 1.33331 8.00037 1.33331C10.9855 1.33331 13.5123 3.29526 14.3618 6C13.5123 8.70473 10.9855 10.6666 8.00039 10.6666C5.01529 10.6666 2.48842 8.70471 1.63892 5.99996Z"
        stroke="#1F1F5C"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <Input
      name={props.name}
      type={showPassword ? "text" : "password"}
      placeholder={props.placeholder}
      setValue={props.setValue}
      error={props.error}
      tabIndex={props.tabIndex}
      iconProps={
        showPassword
          ? {
              icon: openEye,
              changeDisplay: () => setShowPassword((show) => !show),
            }
          : {
              icon: closedEye,
              changeDisplay: () => setShowPassword((show) => !show),
            }
      }
    />
  );
};
