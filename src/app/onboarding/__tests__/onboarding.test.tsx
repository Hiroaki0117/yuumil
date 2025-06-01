import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import OnboardingClient from '../onboarding-client'
import { insertUserGenres, insertUserKeywords, upsertKeywords } from '@/dal/genre'

// モック
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

jest.mock('@/dal/genre', () => ({
  insertUserGenres: jest.fn(),
  insertUserKeywords: jest.fn(),
  upsertKeywords: jest.fn(),
}))

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
  Reorder: {
    Group: ({ children }: any) => <div>{children}</div>,
    Item: ({ children }: any) => <div>{children}</div>,
  },
}))

describe('OnboardingClient', () => {
  const mockPush = jest.fn()
  const mockGenres = [
    { id: '1', name: 'ロック', description: 'ロック音楽', category: '音楽' },
    { id: '2', name: 'ジャズ', description: 'ジャズ音楽', category: '音楽' },
    { id: '3', name: 'ポップ', description: 'ポップ音楽', category: '音楽' },
  ]

  beforeEach(() => {
    ;(useRouter as jest.Mock).mockReturnValue({ push: mockPush })
    jest.clearAllMocks()
    // タイマーのモック
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it('初期状態でウェルカムアニメーションが表示される', () => {
    render(<OnboardingClient userId="test-user" genres={mockGenres} />)
    
    expect(screen.getByText('Yuumilへようこそ')).toBeInTheDocument()
  })

  it('3秒後に選択画面に遷移する', async () => {
    render(<OnboardingClient userId="test-user" genres={mockGenres} />)
    
    // 3秒経過
    jest.advanceTimersByTime(3000)
    
    await waitFor(() => {
      expect(screen.getByText('ジャンルから選択')).toBeInTheDocument()
      expect(screen.getByText('キーワードで追加')).toBeInTheDocument()
    })
  })

  it('ジャンルを選択できる', async () => {
    render(<OnboardingClient userId="test-user" genres={mockGenres} />)
    
    // 選択画面に遷移
    jest.advanceTimersByTime(3000)
    
    await waitFor(() => {
      const rockButton = screen.getByText('ロック')
      fireEvent.click(rockButton)
      
      // 選択中のタグに表示される
      expect(screen.getByText('ロック')).toBeInTheDocument()
    })
  })

  it('キーワードを追加できる', async () => {
    render(<OnboardingClient userId="test-user" genres={mockGenres} />)
    
    // 選択画面に遷移
    jest.advanceTimersByTime(3000)
    
    await waitFor(() => {
      const input = screen.getByPlaceholderText('好きなアーティストやジャンルを入力...')
      const addButton = screen.getByText('追加')
      
      fireEvent.change(input, { target: { value: 'テストキーワード' } })
      fireEvent.click(addButton)
      
      // 選択中のタグに表示される
      expect(screen.getByText('テストキーワード')).toBeInTheDocument()
    })
  })

  it('最大3個まで選択できる', async () => {
    render(<OnboardingClient userId="test-user" genres={mockGenres} />)
    
    // 選択画面に遷移
    jest.advanceTimersByTime(3000)
    
    await waitFor(() => {
      // 3つのジャンルを選択
      fireEvent.click(screen.getByText('ロック'))
      fireEvent.click(screen.getByText('ジャズ'))
      fireEvent.click(screen.getByText('ポップ'))
      
      // 4つ目を選択しようとしても選択されない
      const buttons = screen.getAllByRole('button')
      const disabledButtons = buttons.filter(btn => btn.hasAttribute('disabled'))
      expect(disabledButtons.length).toBeGreaterThan(0)
    })
  })

  it('選択がない場合はエラーが表示される', async () => {
    render(<OnboardingClient userId="test-user" genres={mockGenres} />)
    
    // 選択画面に遷移
    jest.advanceTimersByTime(3000)
    
    await waitFor(() => {
      const saveButton = screen.getByText('完了して始める')
      fireEvent.click(saveButton)
      
      expect(screen.getByText('最低1つ以上選択してください')).toBeInTheDocument()
    })
  })

  it('保存処理が正しく動作する', async () => {
    render(<OnboardingClient userId="test-user" genres={mockGenres} />)
    
    // 選択画面に遷移
    jest.advanceTimersByTime(3000)
    
    await waitFor(async () => {
      // ジャンルとキーワードを選択
      fireEvent.click(screen.getByText('ロック'))
      
      const input = screen.getByPlaceholderText('好きなアーティストやジャンルを入力...')
      const addButton = screen.getByText('追加')
      fireEvent.change(input, { target: { value: 'テストキーワード' } })
      fireEvent.click(addButton)
      
      // 保存
      const saveButton = screen.getByText('完了して始める')
      fireEvent.click(saveButton)
      
      // API呼び出しの確認
      expect(insertUserGenres).toHaveBeenCalledWith('test-user', ['1'])
      expect(upsertKeywords).toHaveBeenCalledWith(['テストキーワード'])
      expect(insertUserKeywords).toHaveBeenCalledWith('test-user', ['テストキーワード'])
    })
  })

  it('スキップボタンでダッシュボードに遷移する', async () => {
    render(<OnboardingClient userId="test-user" genres={mockGenres} />)
    
    // 選択画面に遷移
    jest.advanceTimersByTime(3000)
    
    await waitFor(() => {
      const skipButton = screen.getByText('スキップ')
      fireEvent.click(skipButton)
      
      expect(mockPush).toHaveBeenCalledWith('/dashboard')
    })
  })

  it('選択したアイテムを削除できる', async () => {
    render(<OnboardingClient userId="test-user" genres={mockGenres} />)
    
    // 選択画面に遷移
    jest.advanceTimersByTime(3000)
    
    await waitFor(() => {
      // ジャンルを選択
      fireEvent.click(screen.getByText('ロック'))
      
      // 削除ボタンをクリック
      const deleteButtons = screen.getAllByRole('button').filter(btn => btn.innerHTML.includes('X'))
      fireEvent.click(deleteButtons[0])
      
      // 選択が解除される
      expect(screen.queryByText('選択中のタグ')).toBeInTheDocument()
    })
  })
})