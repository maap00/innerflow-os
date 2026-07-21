import { create } from "zustand";

import { supabase } from "../lib/supabase";

export const useAuthStore = create(
  (set, get) => ({
    // =========================
    // STATE
    // =========================

    user: null,

    session: null,

    loading: false,

    initialized: false,

    error: null,

    // =========================
    // INITIALIZE AUTH
    // =========================

    setSession: (session) =>
        set({
            session,
            user: session?.user ?? null,
        }),

    initializeAuth: async () => {
      if (get().initialized) {
        return;
      }

      set({
        loading: true,
        error: null,
      });

      try {
        const {
          data: { session },
          error,
        } =
          await supabase.auth.getSession();

        if (error) {
          throw error;
        }

        set({
          session,
          user:
            session?.user ??
            null,
          initialized: true,
          loading: false,
        });
      } catch (error) {
        set({
          session: null,
          user: null,
          initialized: true,
          loading: false,
          error:
            error.message,
        });
      }
    },

    // =========================
    // SIGN UP
    // =========================

    signUp: async (
      email,
      password
    ) => {
      set({
        loading: true,
        error: null,
      });

      const {
        data,
        error,
      } =
        await supabase.auth.signUp(
          {
            email,
            password,
          }
        );

      if (error) {
        set({
          loading: false,
          error:
            error.message,
        });

        return {
          success: false,
          error,
        };
      }

      set({
        session:
          data.session,
        user:
          data.user,
        loading: false,
      });

      return {
        success: true,
        data,
      };
    },

    // =========================
    // SIGN IN
    // =========================

   signIn: async (
  email,
  password
) => {
  set({
    loading: true,
    error: null,
  });

  try {
    const {
      data,
      error,
    } =
      await supabase.auth
        .signInWithPassword({
          email,
          password,
        });

    if (error) {
      console.log(
        "Supabase Auth Error:",
        error
      );

      set({
        loading: false,
        error: error.message,
      });

      return {
        success: false,
        error,
      };
    }

    set({
      session: data.session,
      user: data.user,
      loading: false,
    });

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.log(
      "Network/Auth Error:",
      error
    );

    set({
      loading: false,
      error:
        error?.message ??
        "Network request failed",
    });

    return {
      success: false,
      error,
    };
  }
},

    // =========================
    // SIGN OUT
    // =========================

    signOut: async () => {
      set({
        loading: true,
        error: null,
      });

      const { error } =
        await supabase.auth
          .signOut();

      if (error) {
        set({
          loading: false,
          error:
            error.message,
        });

        return {
          success: false,
          error,
        };
      }

      set({
        session: null,
        user: null,
        loading: false,
      });

      return {
        success: true,
      };
    },

    // =========================
    // RESET PASSWORD
    // =========================

    resetPassword: async (
      email
    ) => {
      set({
        loading: true,
        error: null,
      });

      const { error } =
        await supabase.auth
          .resetPasswordForEmail(
            email
          );

      if (error) {
        set({
          loading: false,
          error:
            error.message,
        });

        return {
          success: false,
          error,
        };
      }

      set({
        loading: false,
      });

      return {
        success: true,
      };
    },

    // =========================
    // CLEAR ERROR
    // =========================

    clearError: () =>
      set({
        error: null,
      }),
  })
);