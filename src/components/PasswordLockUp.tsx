import React, { Dispatch, SetStateAction, useState } from 'react';

type PasswordLockupProps = {
    setPassword: Dispatch<SetStateAction<string | undefined>>;
    password: string | undefined;
}

const PasswordLockUp = (props: PasswordLockupProps) => {
    const {password, setPassword} = props;
    const [show, setShow] = useState(true);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
      };
    
    const handleSubmit = (e) => {
    e.preventDefault();
    setShow(false);
    };

    if (!show) {
        return null;
    }

    return (
        <>
            <div id="static-modal" data-modal-backdrop="static" tabIndex={-1} aria-hidden="true" className="fixed top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                            </div>
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PasswordLockUp;