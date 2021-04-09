const Spinner = ({description=null}) => {
    return (
        <>
            <div className="flex h-center">
                <div className="spinner mt-3"></div>            
            </div>
            <p className="text-center mt-1">{description && description}</p>
        </>
    )
}

export default Spinner;