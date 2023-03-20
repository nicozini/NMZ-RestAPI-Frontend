
const Alerta = ({alerta}) => {
    const { msg, error } = alerta;

    return (
        <div className={`${error ? 'alerta-error' : 'alerta-confirmar'} anotherClassName`}>
            {msg}
        </div>
    )
}

export default Alerta