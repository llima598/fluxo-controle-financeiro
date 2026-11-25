
import { useState, type FormEvent, type MouseEvent } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import Icon from './Icon'

interface ProfileModalProps {
  user: User
  onClose: () => void
}

export default function ProfileModal({ user, onClose }: ProfileModalProps) {
  const [name, setName] = useState(
    typeof user.user_metadata?.full_name === 'string'
      ? user.user_metadata.full_name
      : '',
  )
  const [email, setEmail] = useState(user.email ?? '')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const [nameLoading, setNameLoading] = useState(false)
  const [emailLoading, setEmailLoading] = useState(false)
  const [passwordLoading, setPasswordLoading] = useState(false)

  const [nameMessage, setNameMessage] = useState('')
  const [emailMessage, setEmailMessage] = useState('')
  const [passwordMessage, setPasswordMessage] = useState('')

  function stopPropagation(event: MouseEvent<HTMLElement>): void {
    event.stopPropagation()
  }

  async function saveName(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setNameMessage('')

    const trimmedName = name.trim()

    if (!trimmedName) {
      setNameMessage('Informe seu nome completo.')
      return
    }

    setNameLoading(true)

    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: trimmedName,
        },
      })

      if (error) throw error

      setName(trimmedName)
      setNameMessage('Nome atualizado com sucesso!')
    } catch (error) {
      console.error('Erro ao atualizar nome:', error)
      setNameMessage(
        error instanceof Error
          ? error.message
          : 'Não foi possível atualizar seu nome.',
      )
    } finally {
      setNameLoading(false)
    }
  }

  async function saveEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setEmailMessage('')

    const trimmedEmail = email.trim()

    if (!trimmedEmail) {
      setEmailMessage('Informe um e-mail válido.')
      return
    }

    if (trimmedEmail.toLowerCase() === user.email?.toLowerCase()) {
      setEmailMessage('O novo e-mail é igual ao atual.')
      return
    }

    setEmailLoading(true)

    try {
      const { error } = await supabase.auth.updateUser({
        email: trimmedEmail,
      })

      if (error) throw error

      setEmailMessage(
        'Solicitação enviada! Confira sua caixa de entrada para confirmar a alteração.',
      )
    } catch (error) {
      console.error('Erro ao atualizar e-mail:', error)
      setEmailMessage(
        error instanceof Error
          ? error.message
          : 'Não foi possível solicitar a alteração do e-mail.',
      )
    } finally {
      setEmailLoading(false)
    }
  }

  async function savePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPasswordMessage('')

    if (password.length < 6) {
      setPasswordMessage('A senha deve ter pelo menos 6 caracteres.')
      return
    }

    if (password !== passwordConfirmation) {
      setPasswordMessage('As senhas não coincidem.')
      return
    }

    setPasswordLoading(true)

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      })

      if (error) throw error

      setPassword('')
      setPasswordConfirmation('')
      setPasswordMessage('Senha alterada com sucesso!')
    } catch (error) {
      console.error('Erro ao atualizar senha:', error)
      setPasswordMessage(
        error instanceof Error
          ? error.message
          : 'Não foi possível alterar sua senha.',
      )
    } finally {
      setPasswordLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[10] grid place-items-center overflow-y-auto bg-[rgba(11,29,21,0.46)] p-5"
      onMouseDown={onClose}
    >
      <section
        className="relative my-auto w-full max-w-[540px] rounded-[17px] bg-white p-[30px] shadow-[0_24px_70px_rgba(0,0,0,0.22)] max-[680px]:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-title"
        onMouseDown={stopPropagation}
      >
        <button
          className="absolute right-[18px] top-[18px] bg-transparent p-1 text-[#718077]"
          onClick={onClose}
          type="button"
          aria-label="Fechar"
        >
          <Icon name="close" size={20} />
        </button>

        <p className="mb-[7px] text-[11px] font-bold uppercase tracking-[0.13em] text-[#6d7a72]">
          Sua conta
        </p>

        <h2
          className="mb-2 text-2xl font-bold tracking-[-0.03em] text-[#183d30]"
          id="profile-title"
        >
          Meu perfil
        </h2>

        <p className="mb-6 text-sm text-[#6d7a72]">
          Gerencie seus dados pessoais e informações de acesso.
        </p>

        <div className="flex flex-col gap-6">
          <form onSubmit={saveName}>
            <h3 className="mb-3 text-sm font-bold text-[#183d30]">
              Dados pessoais
            </h3>

            <label
              htmlFor="profile-name"
              className="mb-1.5 block text-xs font-semibold text-[#52645a]"
            >
              Nome completo
            </label>

            <input
              id="profile-name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Seu nome completo"
              required
              className="w-full rounded-[10px] border border-[#dce4de] bg-white px-3.5 py-3 text-sm text-[#183d30] outline-none transition focus:border-[#1d6b4e]"
            />

            <button
              type="submit"
              disabled={nameLoading}
              className="mt-3 rounded-[10px] bg-[#1d6b4e] px-4 py-2.5 text-[13px] font-bold text-white transition hover:bg-[#17583f] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {nameLoading ? 'Salvando...' : 'Salvar nome'}
            </button>

            {nameMessage && (
              <p className="mt-2 text-xs text-[#52645a]" role="status">
                {nameMessage}
              </p>
            )}
          </form>

          <div className="h-px bg-[#e8eee9]" />

          <form onSubmit={saveEmail}>
            <h3 className="mb-3 text-sm font-bold text-[#183d30]">
              E-mail de acesso
            </h3>

            <label
              htmlFor="profile-email"
              className="mb-1.5 block text-xs font-semibold text-[#52645a]"
            >
              E-mail
            </label>

            <input
              id="profile-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="w-full rounded-[10px] border border-[#dce4de] bg-white px-3.5 py-3 text-sm text-[#183d30] outline-none transition focus:border-[#1d6b4e]"
            />

            <button
              type="submit"
              disabled={emailLoading}
              className="mt-3 rounded-[10px] border border-[#dce4de] bg-white px-4 py-2.5 text-[13px] font-bold text-[#52645a] transition hover:bg-[#f0f5f1] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {emailLoading ? 'Enviando...' : 'Alterar e-mail'}
            </button>

            {emailMessage && (
              <p className="mt-2 text-xs text-[#52645a]" role="status">
                {emailMessage}
              </p>
            )}
          </form>

          <div className="h-px bg-[#e8eee9]" />

          <form onSubmit={savePassword}>
            <h3 className="mb-3 text-sm font-bold text-[#183d30]">
              Alterar senha
            </h3>

            <label
              htmlFor="profile-password"
              className="mb-1.5 block text-xs font-semibold text-[#52645a]"
            >
              Nova senha
            </label>

            <input
              id="profile-password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Mínimo de 6 caracteres"
              minLength={6}
              required
              className="mb-3 w-full rounded-[10px] border border-[#dce4de] bg-white px-3.5 py-3 text-sm text-[#183d30] outline-none transition focus:border-[#1d6b4e]"
            />

            <label
              htmlFor="profile-password-confirmation"
              className="mb-1.5 block text-xs font-semibold text-[#52645a]"
            >
              Confirme a nova senha
            </label>

            <input
              id="profile-password-confirmation"
              type="password"
              autoComplete="new-password"
              value={passwordConfirmation}
              onChange={(event) =>
                setPasswordConfirmation(event.target.value)
              }
              placeholder="Digite a senha novamente"
              minLength={6}
              required
              className="w-full rounded-[10px] border border-[#dce4de] bg-white px-3.5 py-3 text-sm text-[#183d30] outline-none transition focus:border-[#1d6b4e]"
            />

            <button
              type="submit"
              disabled={passwordLoading}
              className="mt-3 rounded-[10px] border border-[#dce4de] bg-white px-4 py-2.5 text-[13px] font-bold text-[#52645a] transition hover:bg-[#f0f5f1] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {passwordLoading ? 'Salvando...' : 'Alterar senha'}
            </button>

            {passwordMessage && (
              <p className="mt-2 text-xs text-[#52645a]" role="status">
                {passwordMessage}
              </p>
            )}
          </form>
        </div>
      </section>
    </div>
  )
}
