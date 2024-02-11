import Volunteer from '../../entities/volunteer.entity.js'

interface DeleteModalProps {
  volunteer: Volunteer
}

export default function DeleteVolunteerModal({ volunteer }: Readonly<DeleteModalProps>) {
  return (
    <dialog id={'modal-excluir-' + volunteer.id} className="modal">
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">Tem certeza que deseja excluir?</h3>

        <div className="modal-action">
          {/* if there is a button in form, it will close the modal */}
          <button id="btnModal" className="btn">
            Sim
          </button>
          <button id="btnModal" className="btn">
            Não
          </button>
        </div>
      </form>
    </dialog>
  )
}
