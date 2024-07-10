import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom";
import InviteGuestsModal from "./invite-guests-modal";
import ConfirmTripModal from "./confirm-trip-modal";
import DestinationAndDateStep from "./steps/destination-and-date-step";
import InviteGuestsStep from "./steps/invite-guests-step";

function CreateTripPage() {
  const navigate = useNavigate();

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);

  function openGuestsInput() {
    setIsGuestsInputOpen(true);
  }

  function closeGuestsInput() {
    setIsGuestsInputOpen(false);
  }

  function openGuestsModal() {
    setIsGuestsModalOpen(true);
  }

  function closeGuestsModal() {
    setIsGuestsModalOpen(false);
  }

  function openConfirmTripModal() {
    setIsConfirmTripModalOpen(true);
  }

  function closeConfirmTripModal() {
    setIsConfirmTripModalOpen(false);
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const email = new FormData(event.currentTarget).get('email')?.toString();

    if (!email) {
      return
    } 

    if (emailsToInvite.includes(email)) {
      return
    }

    setEmailsToInvite([
      ...emailsToInvite,
      email
    ]);
    
    event.currentTarget.reset();
  }

  function removeEmailFromInvites(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(email => email !== emailToRemove);
    setEmailsToInvite(newEmailList)
  }

  function createTrip() {
    navigate("/trips/123")
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>

        <div className="space-y-4">
          <DestinationAndDateStep isGuestsInputOpen={isGuestsInputOpen} openGuestsInput={openGuestsInput} closeGuestsInput={closeGuestsInput}></DestinationAndDateStep>

          {isGuestsInputOpen && <InviteGuestsStep emailsToInvite={emailsToInvite} openConfirmTripModal={openConfirmTripModal} openGuestsModal={openGuestsModal}></InviteGuestsStep>}
        </div>

        <p className="text-sm text-zinc-500">Ao planejar sua viagem pela plann.er você automaticamente concorda <br /> com nossos <a className="text-zinc-300 underline" href="">termos de uso</a> e <a className="text-zinc-300 underline" href="">políticas de privacidade</a>.</p>
      </div>

      {isGuestsModalOpen && <InviteGuestsModal closeGuestsModal={closeGuestsModal} emailsToInvite={emailsToInvite} removeEmailFromInvites={removeEmailFromInvites} addNewEmailToInvite={addNewEmailToInvite}></InviteGuestsModal>}

      {isConfirmTripModalOpen && <ConfirmTripModal closeConfirmTripModal={closeConfirmTripModal} createTrip={createTrip}></ConfirmTripModal>}
    </div>
  )
}

export default CreateTripPage