import {useToast} from "@chakra-ui/react";

export default function useAlert() {
  const toast = useToast();

  function successToast(title:string="Success", description:string="") {
    toast({
      title,
      description,
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
  }

  function errorToast(title:string="Success", description:string="") {
    toast({
      title,
      description,
      status: 'error',
      duration: 2000,
      isClosable: true,
    })
  }

  return {successToast, errorToast};
}