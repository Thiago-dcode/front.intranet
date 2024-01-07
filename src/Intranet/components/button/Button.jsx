

// eslint-disable-next-line react/prop-types
export default function Button({ content = '', type = 'button', name = '', handleBtn = () => { },params= [], zIndex = '50', bgColor = 'black', color = 'white', className = 'flex flex-row items-center gap-2 sticky bottom-0 rounded-md text-white px-2', children = null }) {
    return (
        <button onClick={(e) => {
            handleBtn(...[...params,e])
        }} type={type} name={name} style={{
            backgroundColor: bgColor,
            color,
            zIndex
        }} className={className}>
            {content && <p>
                {content}
            </p>}

            {children}
        </button>
    )
}
