import { FC, ChangeEvent, Dispatch, SetStateAction } from "react";
import "./ToggleSwitch.css";

export interface ToggleSwitchProps {
  checked: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>;
}

export const ToggleSwitch: FC<ToggleSwitchProps> = ({
  checked,
  setChecked,
}) => (
  <div className="switch">
    <input
      type="checkbox"
      name="toggle-switch"
      checked={checked}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        setChecked(e.target.checked)
      }
      tabIndex={-1}
    />
    <span className="slider round" />
  </div>
);
