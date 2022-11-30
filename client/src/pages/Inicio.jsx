import PageSalas from '../components/salas/PageSalas'
import PageReservaciones from '../components/reservaciones/PageReservaciones'

export default function Inicio() {
    return (
        <div className='flex mt-10 justify-center'>
            <PageSalas />
            <PageReservaciones />
        </div>
    )
}
