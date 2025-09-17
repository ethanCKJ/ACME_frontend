import {useAuth} from "../../../contexts/AuthContext";
import {useEffect, useState} from "react";
import {Roles} from "../../../types/types";

export interface CheckoutSteppingProps {
  maxStep: number;
}

export const useCheckoutStepping = ({maxStep}:CheckoutSteppingProps) => {
  const { role } = useAuth();
  const [minStep, setMinStep] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [disabledSteps, setDisabledSteps] = useState<number[]>([]);

  const disableStep = (step: number) => {
    setDisabledSteps([...disabledSteps, step]);
    if (activeStep === disabledSteps) {
      // Try finding the next available step forwards
      handleNext();
      if (activeStep === disabledSteps) {
        // Try finding the next available step backwards
        handlePrevious();
      }
    }
  }


  // When user logs in, make the 'sign in or continue as guest' step inaccessible for customers
  useEffect(() => {
    const newMinStep = role === Roles.ROLE_CUSTOMER ? 1 : 0;
    if (activeStep < newMinStep) {
      setActiveStep(newMinStep);
    }
    setMinStep(newMinStep);
  }, [role]);

  // Move to previous non-disabled step. If unable to find one, stay on current step.
  const handlePrevious = () => {
    for (let currentStep = activeStep; currentStep > minStep; currentStep--) {
      if (!disabledSteps.includes(currentStep - 1)) {
        setActiveStep(currentStep - 1);
        return;
      }
    }
  };

  // Move to previous-non-disabled step. If unable to find one, stay on current step.
  const handleNext = () => {
    for (let currentStep = activeStep; currentStep < maxStep; currentStep++) {
      if (!disabledSteps.includes(currentStep + 1)) {
        setActiveStep(currentStep + 1);
        return;
      }
    }
  };
  return {activeStep, handlePrevious, handleNext,disableStep};
}