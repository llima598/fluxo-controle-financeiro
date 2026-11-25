
import { useState, type FormEvent } from 'react'
import { supabase } from '../lib/supabase'
import Icon from './Icon'

type AuthMode = 'login' | 'register' | 'recovery'

export default function AuthForm() {
  const [mode, setMode] = useState<AuthMode>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setLoading(true)
    setMessage('')
    setError('')

    try {
      if (mode === 'register') {
        if (!name.trim()) {
          throw new Error('Informe seu nome completo.')
        }

        const { data, error: authError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              full_name: name.trim(),
            },
          },
        })

        if (authError) throw authError

        if (data.session) {
          setMessage('Conta criada com sucesso! Você já pode acessar o Fluxo.')
        } else {
          setMessage(
            'Cadastro realizado! Verifique seu e-mail para confirmar sua conta antes de entrar.',
          )
        }
      }

      if (mode === 'login') {
        const { error: authError } =
          await supabase.auth.signInWithPassword({
            email: email.trim(),
            password,
          })

        if (authError) throw authError
      }

      if (mode === 'recovery') {
        const { error: authError } =
          await supabase.auth.resetPasswordForEmail(email.trim(), {
            redirectTo: window.location.origin,
          })

        if (authError) throw authError

        setMessage(
          'Se o endereço estiver cadastrado, você receberá um e-mail com as instruções para redefinir sua senha.',
        )
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Não foi possível realizar a operação. Tente novamente.',
      )
    } finally {
      setLoading(false)
    }
  }

  const isRecovery = mode === 'recovery'

  const title =
    mode === 'register'
      ? 'Crie sua conta'
      : isRecovery
        ? 'Recuperar senha'
        : 'Bem-vindo de volta'

  const description =
    mode === 'register'
      ? 'Comece a organizar sua vida financeira.'
      : isRecovery
        ? 'Informe seu e-mail para receber as instruções de recuperação.'
        : 'Entre na sua conta para acessar suas finanças.'

  return (
    <main className="grid min-h-screen place-items-center bg-[#f7f8f6] px-4 py-10">
      <section className="w-full max-w-[420px] rounded-2xl border border-[#e9ede9] bg-white p-7 shadow-[0_12px_40px_rgba(23,57,42,0.07)] sm:p-9">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 grid size-14 place-items-center rounded-2xl bg-[#1d6b4e] text-white">
            <Icon name="wallet" size={27} />
          </div>

          <h1 className="font-['Playfair_Display',serif] text-3xl font-bold text-[#183d30]">
            Fluxo
          </h1>

          <h2 className="mt-5 text-xl font-bold text-[#17201b]">
            {title}
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#849088]">
            {description}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === 'register' && (
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-[#35443b]"
              >
                Nome completo
              </label>

              <input
                id="name"
                type="text"
                required
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Seu nome completo"
                className="w-full rounded-lg border border-[#dce4dd] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#1d6b4e] focus:ring-2 focus:ring-[#1d6b4e]/10"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-[#35443b]"
            >
              E-mail
            </label>

            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="seu@email.com"
              className="w-full rounded-lg border border-[#dce4dd] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#1d6b4e] focus:ring-2 focus:ring-[#1d6b4e]/10"
            />
          </div>

          {!isRecovery && (
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-[#35443b]"
              >
                Senha
              </label>

              <input
                id="password"
                type="password"
                required
                minLength={6}
                autoComplete={
                  mode === 'register' ? 'new-password' : 'current-password'
                }
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Mínimo de 6 caracteres"
                className="w-full rounded-lg border border-[#dce4dd] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#1d6b4e] focus:ring-2 focus:ring-[#1d6b4e]/10"
              />
            </div>
          )}

          {error && (
            <p
              className="rounded-lg bg-[#fcedea] px-3 py-3 text-sm text-[#a33e32]"
              role="alert"
            >
              {error}
            </p>
          )}

          {message && (
            <p
              className="rounded-lg bg-[#edf6ef] px-3 py-3 text-sm leading-5 text-[#246044]"
              role="status"
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#1d6b4e] px-4 py-3 font-bold text-white transition hover:bg-[#15533b] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? 'Aguarde...'
              : mode === 'register'
                ? 'Criar conta'
                : isRecovery
                  ? 'Enviar instruções'
                  : 'Entrar'}
          </button>
        </form>

        <div className="mt-6 space-y-3 text-center text-sm">
          {mode === 'login' && (
            <>
              <button
                type="button"
                onClick={() => {
                  setMode('recovery')
                  setMessage('')
                  setError('')
                }}
                className="font-medium text-[#1d6b4e] hover:underline"
              >
                Esqueci minha senha
              </button>

              <p className="text-[#849088]">
                Ainda não tem uma conta?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('register')
                    setMessage('')
                    setError('')
                  }}
                  className="font-bold text-[#1d6b4e] hover:underline"
                >
                  Cadastre-se
                </button>
              </p>
            </>
          )}

          {mode === 'register' && (
            <p className="text-[#849088]">
              Já tem uma conta?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('login')
                  setMessage('')
                  setError('')
                }}
                className="font-bold text-[#1d6b4e] hover:underline"
              >
                Fazer login
              </button>
            </p>
          )}

          {isRecovery && (
            <button
              type="button"
              onClick={() => {
                setMode('login')
                setMessage('')
                setError('')
              }}
              className="font-bold text-[#1d6b4e] hover:underline"
            >
              Voltar para o login
            </button>
          )}
        </div>
      </section>
    </main>
  )
}
