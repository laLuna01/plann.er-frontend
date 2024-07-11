import { X, Tag, Calendar } from "lucide-react";
import Button from "../../components/button";

interface CreateActivityModalProps {
    closeCreateActivityModal: () => void
}

const CreateActivityModal = (props: CreateActivityModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
        <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Cadastrar atividade</h2>
                <button type="button" onClick={props.closeCreateActivityModal}><X className="size-5 text-zinc-400"></X></button>
                </div>
                <p className="text-sm text-zinc-400">Todos convidados podem visualizar as atividades.</p>
            </div>

            <form className="space-y-3">
                <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <Tag className="size-5 text-zinc-400"></Tag>
                <input className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" type="text" name="title" placeholder="Qual a atividade?" />
                </div>
                <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <Calendar className="size-5 text-zinc-400"></Calendar>
                <input className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" type="datetime-local" name="occurs-at" placeholder="20 de agosto" />
                </div>
                <Button variant="primary" size="full" type="submit">Salvar atividade</Button>
            </form>
        </div>
    </div>
  )
};

export default CreateActivityModal;