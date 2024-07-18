import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
} from '@chakra-ui/react';
import TemplateCard from './Template-card';

const Heading = {
  marginLeft: "5px",
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  lineHeight: 1.5,
  fontWeight: 700,
  fontSize: '20px',
  color: 'rgb(63, 81, 117)',
};

const sub_Heading = {
  marginLeft: "1px",
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  lineHeight: 1.5,
  fontWeight: 500,
  fontSize: '16px',
  color: 'rgb(63, 81, 117)',
  // marginBottom: "10px"
};

function ChangeTemplate(props: any) {
  return (
    <div>
      <Modal blockScrollOnMount={true} isOpen={props.isOpen} size={"3xl"} isCentered={true} onClose={props.onClose}>
        <ModalOverlay bg='none' backdropFilter='auto' backgroundColor="#0D1115D1" backdropBlur='5px' />
        <ModalContent>
          <ModalHeader style={Heading}>Templates</ModalHeader>
          <ModalBody>
            <div className="mx-2 my-2">
              <div className="w-full my-8" >
                <input type="text" placeholder='Find something to delop' className="px-2 h-[44px] w-full border border-[#0D11151A]/10 rounded-[4px]" />
              </div>
            </div>
            <div>
              <div className="my-8" style={sub_Heading}>Your Template</div>
              <TemplateCard /> {/* Include the TemplateCard component here */}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={props.onClose}>
              Cancel
            </Button>
            <Button
              backgroundColor={"#1952CE"}
              variant="solid"
              color={"white"}
              borderRadius={"4px"}
              _hover={{ bg: "#8ca9e7", color: "black" }}
              sx={{ background: "linear-gradient(to left, rgb(181, 44, 246), rgb(74, 145, 247))" }}
              marginX={"5px"}
              padding={"10px"}
              className='font-Inter'
              onClick={props.onClose}
            >
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default ChangeTemplate;
