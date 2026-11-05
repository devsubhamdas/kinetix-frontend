import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { useForm } from "react-hook-form";
import useLogin from "../../hooks/useLogin.js";

function LoginModal({ closeModal, isModalOpen }) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const { onSubmit, isLoading, isError } = useLogin();

  // to close login modal after submitting the form
  useEffect(() => {
    if (!isLoading && !isError) {
      closeModal();
    }
  }, [isLoading, isError]);

  if (!isModalOpen) return null;

  return (
    <div
      className="modal-overlay flex justify-center items-center fixed inset-0 backdrop-brightness-50 backdrop-blur-sm px-3 z-50"
      onClick={closeModal}
    >
      <div
        className="modal-content w-72 rounded-3xl
                   bg-white text-neutral-900
                   dark:bg-neutral-900 dark:text-neutral-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b py-3.5 px-5 border-neutral-200 dark:border-neutral-700">
          <div className="text-lg md:text-xl lg:text-2xl font-medium">
            Login
          </div>
          <button
            onClick={closeModal}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-700"
          >
            <RxCross1 className="text-xl" />
          </button>
        </div>

        <div className="pt-3 pb-5 px-5 max-h-[32rem] overflow-y-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <div>
              <input
                type="text"
                id="credential"
                className="block w-full outline-none border px-2 py-1 text-sm
                           bg-white text-neutral-900 placeholder:text-neutral-500
                           border-neutral-300 focus:border-blue-600
                           dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-400
                           dark:border-neutral-700 dark:focus:border-blue-500"
                placeholder="Username or Email"
                {...register("credential", { required: true })}
              />
              <div
                className={`text-xs text-red-600 dark:text-red-400 ${
                  errors.credential?.type === "required" ? "block" : "hidden"
                }`}
              >
                *username or email required
              </div>
            </div>

            <div>
              <input
                type="password"
                id="password"
                className="block w-full outline-none border px-2 py-1 text-sm
                           bg-white text-neutral-900 placeholder:text-neutral-500
                           border-neutral-300 focus:border-blue-600
                           dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-400
                           dark:border-neutral-700 dark:focus:border-blue-500"
                placeholder="Password"
                {...register("password", { required: true })}
              />
              <div
                className={`text-xs text-red-600 dark:text-red-400 ${
                  errors.password?.type === "required" ? "block" : "hidden"
                }`}
              >
                *password required
              </div>
            </div>

            <div className="text-xs">
              <span>Don't have an account? </span>
              <NavLink
                to="/signup"
                className="text-blue-500 dark:text-blue-400 underline underline-offset-1"
                onClick={closeModal}
              >
                Create account.
              </NavLink>
            </div>

            <div>
              <button
                type="submit"
                className="px-6 py-2 font-medium rounded-full mx-auto block mt-5
                           bg-gray-900 hover:bg-gray-800 text-white
                           dark:bg-neutral-100 dark:hover:bg-neutral-200 dark:text-neutral-900"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
