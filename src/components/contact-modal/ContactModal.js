import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import emailService from '../../services/emailService';

export default function ContactModal(props) {
  const [open, setOpen] = React.useState(false);
  const [contactInfo, setContactInfo] = React.useState({
    name: '',
    email: '',
    phone: ''
  });

  let updateValue = (e) => {
    setContactInfo({...contactInfo, [e.target.name]: e.target.value});
  };
  React.useEffect(()=>{
    setOpen(props.open);
  }, [props.open])
  return (
    <React.Fragment>
      
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Contact details</DialogTitle>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              emailService.sendEmail({contactInfo, interactions: props.interactions});
              setOpen(false);
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input name="name" autoFocus required onBlur={updateValue} />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input name="email" required onBlur={updateValue} />
              </FormControl>
              <FormControl>
                <FormLabel>Phone Number</FormLabel>
                <Input name="phone" required  onBlur={updateValue}/>
              </FormControl>
              <Button type="submit" disabled={!contactInfo.name || !contactInfo.email || !contactInfo.phone}>Submit</Button>
            </Stack>
          </form>
          
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
