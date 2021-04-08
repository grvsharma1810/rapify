import './toast.css'
import { createContext, useContext, useState, useEffect } from 'react'
import checkIcon from './assets/check.svg';
import errorIcon from './assets/error.svg';
import { v4 as uuidv4 } from 'uuid';


const ToastContext = createContext({});

export const ToastProvider = ({ children }) => {

    const position = 'bottom-right';
    const dismissTime = 2000;
    const [list, setList] = useState([]);

    useEffect(() => {
        if (list.length > 0) {
            const interval = setInterval(() => {
                deleteToast(list[0].id);
            }, dismissTime);
            return () => {
                clearInterval(interval);
            }
        }
    }, [dismissTime, list]);


    const deleteToast = id => {
        const listItemIndex = list.findIndex(e => e.id === id);
        list.splice(listItemIndex, 1);
        setList([...list]);
    }

    const showSuccessToast = ({ title, description }) => {
        setList([...list, { id: uuidv4(), title, description, icon: checkIcon, backgroundColor: '#38a169' }])
    }

    const showErrorToast = ({ title, description }) => {
        setList([...list, { id: uuidv4(), title, description, icon: errorIcon, backgroundColor: '#e53e3e' }])
    }


    return (
        <ToastContext.Provider value={{ showErrorToast, showSuccessToast }}>
            {children}
            <div className={`toast-container ${position}`}>
                {
                    list.map((toast, i) =>
                        <div
                            key={i}
                            className={`toast`}
                            style={{ backgroundColor: toast.backgroundColor ? toast.backgroundColor : "#9333EA" }}>
                            <img src={toast.icon} alt="" className="toast-icon" />
                            <div className="toast-body">
                                <p className="toast-title">{toast.title}</p>
                                {
                                    toast.description !== '' && toast.description !== null &&
                                    <p className="toast-message">
                                        {toast.description}
                                    </p>
                                }
                            </div>
                            <button className="btn-toast-close" onClick={() => deleteToast(toast.id)}>
                                <i className="fa fa-times-circle text-size-2 text-white"></i>
                            </button>
                        </div>
                    )
                }
            </div>
        </ToastContext.Provider>
    )
}


export const useToast = () => useContext(ToastContext);