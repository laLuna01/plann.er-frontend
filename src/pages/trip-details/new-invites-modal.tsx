import { AtSign, Plus, X } from "lucide-react";
import { FormEvent } from "react";
import Button from "../../components/button";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface NewInvitesModalProps {
    closeNewInvitesModal: () => void
    emailsToInvite: string[]
    removeEmailFromInvites: (emailToRemove: string) => void
    addNewEmailToInvite: (event: FormEvent<HTMLFormElement>) => void
}

const NewInvitesModal = (props: NewInvitesModalProps) => {

    const { tripId } = useParams();
    
    function createInvites() {

        props.emailsToInvite.map(async email => {
            await api.post(`/trips/${tripId}/invites`, {
                email,
            })
        })


        window.document.location.reload();
    }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Selecionar convidados</h2>
            <button type="button" onClick={props.closeNewInvitesModal}><X className="size-5 text-zinc-400"></X></button>
          </div>
          <p className="text-sm text-zinc-400">Os convidados irão receber e-mails para confirmar a participação na viagem.</p>
        </div>
        <div className="flex flex-wrap gap-2">

          {props.emailsToInvite.map(email => {
            return (
              <div key={email} className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2">
                <span className="text-zinc-300">{email}</span>
                <button type="button" onClick={() => props.removeEmailFromInvites(email)}><X className="size-4 text-zinc-400"></X></button>
              </div>
            )
          })}

        </div>

        <div className="w-full h-px bg-zinc-800"></div>

        <form className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2" onSubmit={props.addNewEmailToInvite}>
          <div className="px-2 flex items-center flex-1 gap-2">
            <AtSign className="size-5 text-zinc-400"></AtSign>
            <input className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" type="email" name="email" placeholder="Digite o e-mail do convidado" />
          </div>
          <Button variant="secondary" type="submit">Adicionar
          <Plus className="size-5"></Plus>
          </Button>
        </form>
        <Button variant="primary" size="full" onClick={createInvites}>Enviar convites</Button>
      </div>
    </div>
  )
};

export default NewInvitesModal;